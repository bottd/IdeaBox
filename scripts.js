var titleInput = $('.title-input');
var bodyInput = $('.body-input');
var saveInput = $('.save-input');
var ideaIndex = [];

function idea(title, body, quality) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.html = `
    <article>
      <h2>${this.title}</h2>
      <button class="delete">Delete</button>
      <p>${this.body}</p>
      <button class="upvote">Upvote</button>
      <h4>Quality: ${this.quality}</h4>
    </article>`;
}


saveInput.on('click', function() {
  event.preventDefault();
  var makeThought = new idea(titleInput.val(), bodyInput.val());
  console.log(makeThought.title);
  console.log(makeThought.body);
  console.log(makeThought.html);
  console.log('yay');
  $('.thought').prepend(makeThought.html);
  titleInput.val('');
  bodyInput.val('');
  ideaIndex.push(makeThought);
});

$('.thought').on('click', function(e) {
  var target = $(e.target);
  if (target.hasClass('delete')){
    target.parent().remove();
  }
  if (target.hasClass('upvote')){
    }
});
