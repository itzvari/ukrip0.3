# 1. Налаштовуємо matplotlib у безвіконному режимі
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from qiskit import QuantumCircuit

# 2. Створюємо схему на 7 кубітів та 4 класичні біти
qc = QuantumCircuit(7, 4)

# Етап 1: Ініціалізація суперпозиції
qc.h(range(4))
qc.x(4)
qc.barrier(label="Init")

# Етап 2: Модулярне піднесення до степеня
qc.cp(np.pi / 4, 0, 4)
qc.cp(np.pi / 2, 1, 4)
qc.cp(np.pi, 2, 4)
qc.barrier(label="Mod Exp")

# Етап 3: Обернене квантове перетворення Фур'є (QFT dagger)
qc.h(3)
qc.cp(-np.pi / 2, 2, 3)
qc.h(2)
qc.cp(-np.pi / 4, 1, 2)
qc.cp(-np.pi / 8, 0, 2)
qc.h(1)
qc.cp(-np.pi / 2, 0, 1)
qc.h(0)
qc.barrier(label="QFT Dagger")

# Етап 4: Вимірювання
qc.measure(range(4), range(4))

# 3. Малюємо всю схему в одну лінію (fold=-1) та зберігаємо
fig = qc.draw(output='mpl', style='iqp', scale=1.0, fold=-1)
fig.savefig('shor_7qubit_single.png', dpi=300, bbox_inches='tight')
plt.close(fig)

print("Цілісну схему успішно збережено як 'shor_7qubit_single.png'!")


