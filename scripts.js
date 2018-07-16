var titleInput = $('.title-input');
var bodyInput = $('.body-input');
var saveInput = $('.save-input');
var ideaIndex = [];
var ideaCounter = 0;

function Idea(title, body, quality) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.number = ideaCounter;
  this.index = 0;
  this.html = `
    <article id='${this.number}' class="idea-card">
      <h2>${this.title}</h2>
      <button class="delete"></button>
      <p>${this.body}</p>
      <button class="upvote"></button>
      <button class="downvote"></button>
      <h4>Quality: ${this.quality}</h4>
    </article>`;
}

Idea.prototype.refreshHTML = function(){
  this.html = `
     <article>
       <h2>${this.title}</h2>
       <button class="delete">Delete</button>
       <p>${this.body}</p>
       <button class="upvote">Upvote</button>
       <h4>Quality: ${this.quality}</h4>
     </article>`;
};

saveInput.on('click', function() {
  event.preventDefault();
  var makeThought = new Idea(titleInput.val(), bodyInput.val());
  $('.thought').prepend(makeThought.html);
  titleInput.val('');
  bodyInput.val('');
  ideaIndex.push(makeThought);
  localStorage.setItem('thoughts',JSON.stringify(ideaIndex));
  ideaCounter++;
});

$('.thought').on('click', function(e) {
  var target = $(e.target);
  var id = target.parent().attr('id');
  if (target.hasClass('delete')){
    target.parent().remove();
    var selectIdea = ideaIndex.filter(function(n,index) {
      if (n.number == id) {
        n.index = index;
        return (n.number == id);
      }
    });
    ideaIndex.splice(selectIdea[0].index,1);
    localStorage.setItem('thoughts',JSON.stringify(ideaIndex));
  }
  if (target.hasClass('upvote')){
    n = target.parent().attr('id');
    ideaIndex[n].quality = "plausible";
    target.siblings('h4').text(`Quality: ${ideaIndex[n].quality}`);
    }
});

function populate() {
  ideaIndex.forEach(function(n) {
    Object.setPrototypeOf(n, Idea.prototype);
    $('.thought').prepend(n.html);
  });
}

if (localStorage.getItem('thoughts')) {
  ideaIndex = JSON.parse(localStorage.getItem('thoughts'));
}
populate();
