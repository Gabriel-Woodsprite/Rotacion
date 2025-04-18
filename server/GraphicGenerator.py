import tkinter as tk
from tkinter import messagebox
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import math

class GraphicGenerator:
    def graphicate(self, originalPoints, rotatedPoints):    
        original = originalPoints
        rotada = rotatedPoints

        print(f'puntos de figura {original}')
        # Cerrar figura
        original.append(original[0])
        rotada.append(rotada[0])
        

        ox, oy = zip(*original)
        rx, ry = zip(*rotada)
        
        
        self.fig, self.ax = plt.subplots()
        self.canvas = FigureCanvasTkAgg(self.fig)
        self.canvas.get_tk_widget().pack()
        

        self.ax.clear()
        self.ax.plot(ox, oy, 'bo-', label='Original')
        self.ax.plot(rx, ry, 'ro--', label='Rotada')
        self.ax.set_title("Figura original y rotada")
        self.ax.set_aspect('equal')
        self.ax.grid(True)
        self.ax.legend()
        
        self.fig.savefig("../figure.png")
        