from rest_framework import pagination
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from station88back.config import GMAIL_PASS

def send_email(body: str, user_email:str):
    st88_email = "station88.rg@gmail.com"
    # password = 'ytqq ysot cvtc mufe'
    password = GMAIL_PASS
    subject = "Сообщение с сайта Станции 88"

    message = MIMEMultipart()
    message["From"] = st88_email
    message["To"] = st88_email
    message["Subject"] = subject

    body = body + f"\n email пользователя: {user_email}"
    message.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(st88_email, password)
            server.sendmail(st88_email, st88_email, message.as_string())
            return {'status': 'success', 'message': 'Сообщение успешно отправлено'}
    except Exception as e:
        print(f"Error sending email: {e}")
        return {'status': 'error', 'message': 'Возникла ошибка при отправке сообщения'}



class ArticleTypePagination(pagination.PageNumberPagination):
       page_size = 1000

