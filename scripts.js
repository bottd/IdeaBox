var titleInput = $('.title-input');
var bodyInput = $('.body-input');
var saveInput = $('.save-input');
var ideaCounter = 0;


function idea(title, body, quality) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.number = ideaCounter;
  this.html = `
    <article id=${this.number}>
      <h2>${this.title}</h2>
      <button class="delete">Delete</button>
      <p>${this.body}</p>
      <button class="upvote">Upvote</button>
      <h4>Quality: ${this.quality}</h4>
    </article>`;
}





$('.save-input').on('click', function() {
  event.preventDefault();
  var makeThought = new idea(titleInput.val(), bodyInput.val());
  console.log(makeThought.title);
  console.log(makeThought.body);
  console.log(makeThought.html);
  console.log('yay');
  $('.thought').prepend(makeThought.html);
  titleInput.val('');
  bodyInput.val('');
  ideaCounter ++;
});

