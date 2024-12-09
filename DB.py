import sqlite3

conn = sqlite3.connect('chatbot.db')
cursor = conn.cursor()

table = """CREATE TABLE IF EXISTS question_answers (
        question text,
        output text,
        identify blob
        );"""



conn.commit()
conn.close()