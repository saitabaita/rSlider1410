# rSlider1410
Слайдер тестового задания

Ссылка на страницу со слайдерами: https://saitabaita.github.io/rSlider1410/dist/

Описание архитектуры.

В приложении три слоя: Model View и Controller. Модель (самый абстрактный слой) хранит только атрибуты слайдера: max, min, step, value. View служит для отображения модели включает в себя два класса: rsController (класс бегунка) и rsFill (класс заполнителя). Model и View непосредственно не связаны. Controller - слой, который использует Model и View 

UML диаграмма:

<img src="rSlider1410.jpg"/>
