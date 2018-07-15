var titleInput = $('.title-input');
var bodyInput = $('.body-input');
var saveInput = $('.save-input');
var ideaCounter = 0;
var ideaIndex = [];

function Idea(title, body, quality) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.number = ideaCounter;
  this.html = `
    <article id="${this.number}">
      <h2>${this.title}</h2>
      <button class="delete">Delete</button>
      <p>${this.body}</p>
      <button class="upvote">Upvote</button>
      <h4>Quality: ${this.quality}</h4>
    </article>`;
}

Idea.prototype.refreshHTML = function(){
  this.html = `
     <article id="${this.number}">
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
  ideaCounter ++;
});

$('.thought').on('click', function(e) {
  var target = $(e.target);
  console.log(target.parent().attr('id'));
  if (target.hasClass('delete')){
    target.parent().remove();
  }
  if (target.hasClass('upvote')){
    n = target.parent().attr('id');
    ideaIndex[n].quality = "plausible";
    target.siblings('h4').text(`Quality: ${ideaIndex[n].quality}`);
    }
});
