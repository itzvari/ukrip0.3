# 1. Налаштовуємо matplotlib у безвіконному режимі
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from qiskit import QuantumCircuit

# 2. Створюємо квантову схему на 4 кубіти для алгоритму Куперберга
qc = QuantumCircuit(4, 4)

# Крок 1: Ініціалізація суперпозиції (адамари на всі кубіти)
qc.h(range(4))
qc.barrier(label="Superposition")

# Крок 2: Структурні перетворення та оракул (каскад вентилів CNOT)
qc.cx(0, 2)
qc.cx(1, 3)
qc.cx(0, 1)
qc.cx(2, 3)
qc.barrier(label="Oracle / Cascade")

# Крок 3: Фазові оператори (характерні для алгоритму Куперберга)
for q in range(4):
    qc.p(np.pi / (2**q), q)

qc.cz(0, 2)
qc.cz(1, 3)
qc.barrier(label="Phase Shift")

# Крок 4: Фінальна інтерференція (декогеренція/адамари) та вимірювання
qc.h(range(4))
qc.barrier(label="Interference")
qc.measure(range(4), range(4))

# 3. Генерація графічної схеми у високій якості та збереження
fig = qc.draw(output='mpl', style='iqp', scale=1.2)
fig.savefig('kuperberg_4qubit.png', dpi=300, bbox_inches='tight')
plt.close(fig)

print("Схему алгоритму Куперберга успішно згенеровано та збережено як 'kuperberg_4qubit.png'!")
