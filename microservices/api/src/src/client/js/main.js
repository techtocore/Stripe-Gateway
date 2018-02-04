Stripe.setPublishableKey("pk_test_6jqyc3xTTIoaiNRSYWznjGoo");

$(document).on("ready", () => { $("form-errors").hide(); });

$("#product-form").on("submit", event => {
  event.preventDefault();

  $("form-errors").hide();

  Stripe.card.createToken(
    {
      number: $("#card-number").val(),
      cvc: $("#cvv").val(),
      exp_month: $("#expiry-month").val(),
      exp_year: $("#expiry-year").val()
    },
    stripeResponseHandler
  );

  $("#submit-btn").prop("disabled", true);

});

const stripeResponseHandler = (status, response) => {
  const $form = $("#product-form");
  if (response.error) {
    // Show the errors on the form
    $("#form-errors").show();
    $("#form-errors").html(response.error.message);
    $("#submit-btn").prop("disabled", false);
  } else {
    // response contains id and card, which contains additional card details
    const token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit
    console.log($form.get(0));
    $form.get(0).submit();
  }
};
