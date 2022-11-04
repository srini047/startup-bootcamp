const ideaDisplay = document.querySelector("#ideas");
const baseURL = "http://ideasai.com";

fetch(baseURL + "/ideas")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((idea) => {
      const title =
        `
      <div id='idea'>
            <h5><a href="` +
        idea.url +
        `" target="_blank">` +
        idea.title +
        `</a></h5>
        </div>
        
        <br>`;
      ideaDisplay.insertAdjacentHTML("beforeend", title);
    });
  });
