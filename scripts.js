var titleInput = $('.title-input');
var bodyInput = $('.body-input');
var saveInput = $('.save-input');
var ideaIndex = [];
var qualities = ['swill', 'plausible', 'genius'];

populate();

saveInput.on('click', saveIdea);
$('.thought').on('click', eventDelegation);
$('.thought').on('keyup', editThought);
$('.search').on('keyup', filterThoughts);

function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.number = Date.now();
  this.index = 0;
}

function HTML(idea){
  return `
     <article id='${idea.number}' class="idea-card">
      <h2 contenteditable="true">${idea.title}</h2>
      <button class="delete"></button>
      <p contenteditable="true">${idea.body}</p>
      <button class="upvote"></button>
      <button class="downvote"></button>
      <h4>quality: ${idea.quality}</h4>
    </article>`;
};

function saveIdea(e) {
  e.preventDefault();
  var makeThought = new Idea(titleInput.val(), bodyInput.val());
  $('.thought').prepend(HTML(makeThought));
  titleInput.val('');
  bodyInput.val('');
  ideaIndex.push(makeThought);
  localStorage.setItem('thoughts',JSON.stringify(ideaIndex));
}

function eventDelegation(e) {
  var target = $(e.target);
  var id = target.parent().attr('id');
  var selectIdea = getIdea(id, target);
  if (target.hasClass('delete')){
    target.parent().remove();
    ideaIndex.splice(selectIdea.index,1);
  }
  else if (target.hasClass('upvote')){
    index = qualities.indexOf(selectIdea.quality);
    selectIdea.quality = qualities[qualities.indexOf(selectIdea.quality) + 1] || 'genius';
    target.siblings('h4').text(`Quality: ${selectIdea.quality}`);

    }
  else if (target.hasClass('downvote')){
    index = qualities.indexOf(selectIdea.quality);
    selectIdea.quality = qualities[qualities.indexOf(selectIdea.quality) - 1] || 'swill';
    target.siblings('h4').text(`Quality: ${selectIdea.quality}`);
  }
  localStorage.setItem('thoughts',JSON.stringify(ideaIndex));
}

function editThought(e) {
  var target = $(e.target)
  var id = target.parent().attr('id');
  var selectIdea = getIdea(id, target);
  if(target.is('h2')){
    ideaIndex[selectIdea.index].title = target.text();
    }
  else if(target.is('p')){
    ideaIndex[selectIdea.index].body = target.text();
  }
  localStorage.setItem('thoughts', JSON.stringify(ideaIndex));
}

function filterThoughts() {
  var newIndex = ideaIndex.filter(function(item){
    search = $('.search').val().toLowerCase();
    return (item.title.toLowerCase().includes(search) || item.body.toLowerCase().includes(search))
  });
  $('.thought').empty();
  newIndex.forEach(function(item){
    $('.thought').prepend(item.HTML());
  });

}

function populate() {
  if (localStorage.getItem('thoughts')) {
    ideaIndex = JSON.parse(localStorage.getItem('thoughts'));
    ideaIndex.forEach(function(idea) {
      $('.thought').prepend(HTML(idea));
    });
  }
}

function getIdea(id, target) {
  target.parent();
  var selectIdea = ideaIndex.filter(function(n,index) {
    if (n.number == id) {
      n.index = index;
      return (n.number == id);
    }
  });
  return selectIdea[0]
}
