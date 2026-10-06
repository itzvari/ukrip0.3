# 1. Примусово вказуємо matplotlib працювати в безвіконному режимі
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

from qiskit import QuantumCircuit

# 2. Створюємо схему
qc = QuantumCircuit(2, 2)
qc.h([0, 1])
qc.barrier(label="Init")
qc.cz(0, 1)
qc.barrier(label="Oracle")
qc.h([0, 1])
qc.x([0, 1])
qc.cz(0, 1)
qc.x([0, 1])
qc.h([0, 1])
qc.barrier(label="Diffusion")
qc.measure([0, 1], [0, 1])

# 3. Малюємо і зберігаємо у файл напряму
fig = qc.draw(output='mpl', style='iqp', scale=1.3)
fig.savefig('grover_beautiful.png', dpi=300, bbox_inches='tight')
plt.close(fig)

print("Файл 'grover_beautiful.png' успішно збережено!")
