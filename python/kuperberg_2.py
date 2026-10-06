# 1. Налаштовуємо matplotlib у безвіконному режимі
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from qiskit import QuantumCircuit

# 2. Створюємо 2-кубітну схему для алгоритму Куперберга
qc = QuantumCircuit(2, 2)

# Крок 1: Ініціалізація суперпозиції
qc.h([0, 1])
qc.barrier(label="Init")

# Крок 2: Структурні перетворення та оракул (компактний каскад для 2 кубітів)
qc.cx(0, 1)
qc.barrier(label="Oracle")

# Крок 3: Фазові оператори
qc.p(np.pi / 2, 0)
qc.p(np.pi / 4, 1)
qc.cz(0, 1)
qc.barrier(label="Phase")

# Крок 4: Фінальна інтерференція та вимірювання
qc.h([0, 1])
qc.measure([0, 1], [0, 1])

# 3. Малюємо цілісно в одну лінію (fold=-1) та зберігаємо
fig = qc.draw(output='mpl', style='iqp', scale=1.2, fold=-1)
fig.savefig('kuperberg_2qubit.png', dpi=300, bbox_inches='tight')
plt.close(fig)

print("Схему 2-кубітного Куперберга успішно збережено як 'kuperberg_2qubit.png'!")

