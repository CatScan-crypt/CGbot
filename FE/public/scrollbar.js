var $scrollable  = $(".output-inner"),
    $scrollbar   = $(".scrollbar"),
    height       = $scrollable.outerHeight(true),    // visible height
    scrollHeight = $scrollable.prop("scrollHeight"), // total height
    barHeight    = scrollHeight > height ? height * height / scrollHeight : 0;   // Scrollbar height!

// Set initial scrollbar height:
$scrollbar.height( barHeight );

// Scrollbar drag:
$scrollbar.draggable({
  axis : "y",
  containment : "parent", 
  drag: function(e, ui) {
    $scrollable.scrollTop( scrollHeight / height * ui.position.top  );
  }
}); 

// Element scroll:
$scrollable.on("scroll", function() {
  $scrollbar.css({top: $scrollable.scrollTop() / height * barHeight });
});

// Function to update scrollbar when content is added:
function updateScrollbar() {
  height       = $scrollable.outerHeight(true);
  scrollHeight = $scrollable.prop("scrollHeight");
  barHeight    = scrollHeight > height ? height * height / scrollHeight : 0;
  $scrollbar.height( barHeight );
  if ($scrollable.prop('scrollHeight') > height) {
  // Scroll to bottom
  $scrollable.scrollTop($scrollable.prop('scrollHeight'));
}
}