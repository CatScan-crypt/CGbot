import os
# Define the command to run the other Python file
command = "start /B cmd.exe /c python UI/web.py "

# Use os.system to run the command
os.system(command)