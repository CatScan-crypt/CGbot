#main.py
from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QApplication, QMainWindow
from chat_widget import ChatWidget


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.chat_widget = ChatWidget()
        self.setCentralWidget(self.chat_widget)

        self.setWindowTitle("ChatGPT")

if __name__ == "__main__":
    app = QApplication([])
    window = MainWindow()
    window.show()
    app.exec_()
