from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QWidget, QVBoxLayout, QHBoxLayout, QPushButton, QLineEdit, QTextEdit
import markdown

class ChatWidget(QWidget):
    def __init__(self):
        super().__init__()

        # Create and setup the UI elements
        self.message_history = QTextEdit()
        self.message_history.setReadOnly(True)

        self.input_field = QLineEdit()

        self.send_button = QPushButton("Send")
        self.send_button.clicked.connect(self.on_send_clicked)

        input_layout = QHBoxLayout()
        input_layout.addWidget(self.input_field)
        input_layout.addWidget(self.send_button)

        main_layout = QVBoxLayout()
        main_layout.addWidget(self.message_history)
        main_layout.addLayout(input_layout)

        self.setLayout(main_layout)

    def on_send_clicked(self):
        # Get the user input and add it to the message history
        user_input = self.input_field.text()
        self.message_history.append("\nUser:")
        self.input_field.clear()

        # Render the user input as Markdown and append it to the message history
        markdown_html = markdown.markdown(user_input)
        self.message_history.append(markdown_html)

        # TODO: Use ChatGPT to generate a response and append it to the message history
