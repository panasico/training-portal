// search index for WYSIWYG Web Builder
var database_length = 0;

function SearchPage(url, title, keywords, description)
{
   this.url = url;
   this.title = title;
   this.keywords = keywords;
   this.description = description;
   return this;
}

function SearchDatabase()
{
   database_length = 0;
   this[database_length++] = new SearchPage("templates.index.html", "Training portal", "Обзор тем и курсов  Профиль  Получите диплом   ", "");
   this[database_length++] = new SearchPage("login.html", "Training portal", "Приветствуем на портале обучения и развития  Проходите электронное обучение и аттестацию, получайте справочную информацию, создавайте свои курсы сами, будьте в курсе последних новостей!  Напомнить логин или пароль   ", "");
   this[database_length++] = new SearchPage("reset-login&pass.html", "Training portal", "Восстановление данных для входа  Для восстановления логина и пароля введите свой почтовый адрес. Данные будут отправлены на него после проверки подлинности.   ", "");
   this[database_length++] = new SearchPage("succes_reset-login&pass.html", "Training portal", "Восстановление данных для входа  Данные успешно восстановлены!   ", "");
   return this;
}
