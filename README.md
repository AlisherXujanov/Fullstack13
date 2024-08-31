# Create react-app
1. Create a repository on GitHub 
<!-- RU: Создайте репозиторий на GitHub -->
2. Clone it on your local machine
<!-- RU: Клонируйте его на свою локальную машину -->
3. cd ...  &  code .
<!-- RU: перейдите в папку и откройте ее в VSCode -->
4. Create react project
<!-- RU: Создайте реакт проект -->
```bash
npx create-vite frontend --template react
```
- - if does not work use the code below and repeat installation
<!-- если не работает, используйте код ниже и повторите установку -->

```bash
npm uninstall -g create-react-app
```
5. cd app-name 
<!-- Пройдите к проекту -->

6. npm install (creates node modules)
<!-- Установите зависимости -->

<!-- ------------------------------ -->
<!-- ------------------------------ -->
<!-- ------------------------------ -->
- When you changed something in your code you will need to upload it to you github profile
<!-- Когда вы что-то изменили в своем коде, вам нужно будет загрузить его на свой профиль github -->
1. `git add .`
2. `git commit -m 'message'`
3. `git push`


- NOTE: If it asks for your information, then it means that you have not configured your git-info
<!-- Примечание: Если он запрашивает вашу информацию, это означает, что вы не настроили свою информацию git -->


set your name and email
<!-- Установите свою личность на настройки Git в вашем компютере -->
```bash
git config --global user.name "..."
git config --global user.email "..."
```
then write push again
```bash
git push
```

<!-- ------------------------------ -->
<!-- ------------------------------ -->
<!-- ------------------------------ -->
# When you work with Fullstack16
<!-- Когда вы работаете с Fullstack16 -->
1. git clone ...
2. cd fullstack16
3. code .
4. cd frontend
5. npm install
<!-- ------------------------------ -->
<!-- ------------------------------ -->
<!-- ------------------------------ -->
# During development
<!-- Во время разработки -->

1. if i do `git push`, you must get it by `git pull`
<!-- если я делаю `git push`, вы должны получить его с помощью `git pull` -->
2. if i installed smth, so you must do it too by `npm install`
<!-- если я установил что-то, то вы должны сделать это тоже с помощью `npm install` -->
<!-- ------------------------------ -->
<!-- ------------------------------ -->
<!-- ------------------------------ -->
If `git pull` does not work, delete every change you made and repeat `git pull` again
<!-- Если `git pull` не работает, удалите все изменения, которые вы внесли, и повторите `git pull` снова -->
or, if still does not work, make `git stash` and repeat `git pull`
<!-- или, если все еще не работает, сделайте `git stash` и повторите `git pull` -->