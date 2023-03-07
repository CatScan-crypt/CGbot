import sys
import os
from PyQt5.QtCore import *
from PyQt5.QtWidgets import *
from PyQt5.QtWebEngineWidgets import *

class MainWindow(QMainWindow):
    def __init__(self):
        super(MainWindow, self).__init__()
        self.setWindowTitle("Local HTML Viewer")
        self.browser = QWebEngineView()
        file_path = QDir.current().absoluteFilePath("UI/app.html")
        self.browser.setUrl(QUrl.fromLocalFile(file_path))
        self.setCentralWidget(self.browser)

        # Set up a file system watcher to monitor the HTML file for changes
        self.file_watcher = QFileSystemWatcher([file_path], self)
        self.file_watcher.fileChanged.connect(self.reload)

    # Slot to reload the HTML file
    def reload(self):
        self.browser.reload()

app = QApplication(sys.argv)
window = MainWindow()
window.show()
app.exec_()
