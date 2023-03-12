const scrollbar = document.querySelector(".scrollbar");
const height = scrollbar.offsetHeight;
const scrollHeight = scrollbar.scrollHeight; // total height
const barHeight = height * height / scrollHeight; // Scrollbar height!

// Set the height of the scrollbar
scrollbar.style.height = `${barHeight}px`;

// Update scrollbar position when #output-inner is scrolled
const divElement = document.querySelector("#output-inner");
divElement.addEventListener("scroll", updateScrollbarPosition);

// Update scroll position of #output-inner when user drags scrollbar
scrollbar.addEventListener("mousedown", startDrag);

function updateScrollbarPosition() {
  const currentScrollPosition = divElement.scrollTop; // get the current scroll position of the div element
  let updatedScrollbarPositionValue = currentScrollPosition / scrollHeight * height;
  if (updatedScrollbarPositionValue > 313) {
    updatedScrollbarPositionValue = 313;
  }
  scrollbar.style.top = `${updatedScrollbarPositionValue}px`;
  console.log("currentScrollPosition: ", currentScrollPosition);
  console.log("updatedScrollbarPositionValue: ", updatedScrollbarPositionValue);
}

let isDragging = false;
let startY = 0;
let startScrollPosition = 0;

function startDrag(event) {
  isDragging = true;
  startY = event.clientY;
  startScrollPosition = divElement.scrollTop;
  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", endDrag);
}

function handleDrag(event) {
  if (isDragging) {
    const deltaY = event.clientY - startY;
    const scrollDelta = deltaY / height * scrollHeight;
    let newScrollPosition = startScrollPosition + scrollDelta;
    if (newScrollPosition < 0) {
      newScrollPosition = 0;
    } else if (newScrollPosition > divElement.scrollHeight - divElement.clientHeight) {
      newScrollPosition = divElement.scrollHeight - divElement.clientHeight;
    }
    divElement.scrollTop = newScrollPosition;
    let updatedScrollbarPositionValue = newScrollPosition / scrollHeight * height;
    if (updatedScrollbarPositionValue > 313) {
      updatedScrollbarPositionValue = 313;
    }
    scrollbar.style.top = `${updatedScrollbarPositionValue}px`;
    console.log("deltaY: ", deltaY);
    console.log("scrollDelta: ", scrollDelta);
    console.log("scrollTop: ", divElement.scrollTop);
  }
}

function endDrag() {
  isDragging = false;
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", endDrag);
}
