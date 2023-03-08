#main.py
import os
from FlaskServer import app

# Define the command to run the other Python file
command = "start /B cmd.exe /c python ..//BE/web.py "

# Use os.system to run the command
os.system(command)

if __name__ == '__main__':
    app.run()

    
