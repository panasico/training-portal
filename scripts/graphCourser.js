<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js" type="text/javascript"></script>
<script>
/*<![CDATA[*/
/*
Построение дерева по готовому HTML списку.

Выделяем узлы имющие поддеревья и добавляем у ним метку.
Функция определяет поведение узлов дерева при клике на них. 
 - Изменяет состояние маркера раскрытия (открыт/закрыт).
 - Узлы содержащие в себе другие узлы, по клику разворачиваются 
  или сворачиваются, в зависимости от текущего состояния. 
 - При переходе с одного узла на другой снимается выделение (.current) 
  и пеходит на выбранный узел.
 - Определяет последний узел с поддеревом и скрывает соединительную 
  линию до следующего узла этого уровня.
*/
$(document).ready(function () {
/* Расставляем маркеры на узлах, имющих внутри себя поддерево.
  Выбираем элементы 'li' которые имеют вложенные 'ul', ставим для них 
  маркер, т.е. находим в этом 'li' вложенный тег 'a' 
  и в него дописываем маркер '<em class="marker"></em>'.
  a:first используется, чтобы узлам ниже 1го уровня вложенности 
  маркеры не добавлялись повторно. 
*/
$('#multi-derevo li:has("ul")').find('a:first').prepend('<em class="marker"></em>');
// вешаем событие на клик по ссылке
$('#multi-derevo li span').click(function () {
  // снимаем выделение предыдущего узла
  $('a.current').removeClass('current'); 
  var a = $('a:first',this.parentNode);
  // Выделяем выбранный узел
  //было a.hasClass('current')?a.removeClass('current'):a.addClass('current');
  a.toggleClass('current');
  var li=$(this.parentNode);
  /* если это последний узел уровня, то соединительную линию к следующему
    рисовать не нужно */  
  if (!li.next().length) {
    /* берем корень разветвления <li>, в нем находим поддерево <ul>,
     выбираем прямых потомков ul > li, назначаем им класс 'last' */
    li.find('ul:first > li').addClass('last');
  } 
  // анимация раскрытия узла и изменение состояния маркера
  var ul=$('ul:first',this.parentNode);// Находим поддерево
  if (ul.length) {// поддерево есть
   ul.slideToggle(300); //свернуть или развернуть
   // Меняем сосотояние маркера на закрыто/открыто
   var em=$('em:first',this.parentNode);// this = 'li span'
   // было em.hasClass('open')?em.removeClass('open'):em.addClass('open');
   em.toggleClass('open');
 }
});
})
/*]]>*/
</script>// JavaScript Document