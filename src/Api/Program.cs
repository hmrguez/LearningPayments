using System.Text.Json.Serialization;
using Stripe;
using Stripe.Checkout;
using File = System.IO.File;

var builder = WebApplication.CreateSlimBuilder(args);

// Add serializers
builder.Services.ConfigureHttpJsonOptions((options) =>
{
    options.SerializerOptions.TypeInfoResolverChain.Add(AppJsonSerializerContext.Default);

});

builder.Configuration
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile("appsettings.Secrets.json", optional: true, reloadOnChange: true);

var app = builder.Build();

app.MapPost("/api/webhook", async (HttpRequest request, IConfiguration configuration) =>
{
    var json = await new StreamReader(request.Body).ReadToEndAsync();
    var webhookSecret = configuration["WEBHOOK_SECRET"];
    
    if (string.IsNullOrEmpty(webhookSecret))
    {
        Console.WriteLine("Webhook secret is not configured.");
        return Results.BadRequest("Webhook secret is not configured.");
    }
    
    try
    {
        var stripeEvent = EventUtility.ConstructEvent(
            json,
            request.Headers["Stripe-Signature"],
            webhookSecret
        );


        if (stripeEvent.Type == EventTypes.PaymentIntentSucceeded )
        {

            string filePath = "../../../file.txt";
            string content = stripeEvent.Data.ToJson();

            File.WriteAllText(filePath, content);
            var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
            Console.WriteLine($"Payment succeeded: {paymentIntent.Id}");
        }

        return Results.Ok();
    }
    catch (StripeException e)
    {
        Console.WriteLine($"Webhook error: {e.Message}");
        return Results.BadRequest();
    }
});

StripeConfiguration.ApiKey = builder.Configuration["STRIPE_SECRET_KEY"];

app.MapPost("/create-price", (HttpRequest request, HttpResponse response) =>
{
    var options = new PriceCreateOptions
    {
        UnitAmount = 2000, // Amount in cents (e.g., $20.00)
        Currency = "usd",
        Product = "prod_ROpPJpHw8KkThs", // Your product ID
    };

    var service = new PriceService();
    Price price = service.Create(options);
    Console.WriteLine(price);
    return price.Id;
});

app.MapPost("/create-payment-link", async (HttpRequest request, HttpResponse response) =>
{
    
    var options = new PaymentLinkCreateOptions
    {
        LineItems = new List<PaymentLinkLineItemOptions>
        {
            new PaymentLinkLineItemOptions
            {
                Price = "price_1QW1l6RoiDueZfZZYJCTO4AC",
                Quantity = 1,
            },
        },
    };
    var service = new PaymentLinkService();
    var link = service.Create(options);

    return link;
});

app.Run();

[JsonSerializable(typeof(PaymentLink))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{
}
