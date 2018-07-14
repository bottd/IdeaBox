function idea(title, body) {
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

$('.save-input').on('click', function() {
  event.preventDefault();
  makeThought = new idea($('.title-input').val(),$('.body-input').val());
  console.log(makeThought.title);
  console.log(makeThought.body);
  console.log(makeThought.html);
  console.log('yay');
  $('.saved-thoughts').append(makeThought.html);
});
