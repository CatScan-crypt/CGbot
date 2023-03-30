import os
import openai
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.environ.get("OPENAI_API_KEY")
print(openai.Model.retrieve("code-davinci-001"))