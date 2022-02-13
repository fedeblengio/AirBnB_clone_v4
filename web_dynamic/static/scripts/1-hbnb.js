window.addEventListener('DOMContentLoaded', (event) => {
  let array = [];
  $('input:checkbox').change(function() {
    if ($(this).is(":checked")) {
      const n = ($(this).attr('data-name'));
      array.push(n);
    } else {
      const n = ($(this).attr('data-name'));
      const inx = array.indexOf(n);
      array.splice(inx, 1);
    }
    $('.amenities > h4').text(array.join(', '));
  });
});
