public record PropertyDto
{
    public int Id { get; init; }
    public string Address { get; init; }
    public string Description { get; init; }
    public int NumberOfBedrooms { get; init; }
    public int NumberOfBathrooms { get; init; }
    public decimal SquareFootage { get; init; }
    public decimal MonthlyRent { get; init; }
    public bool IsOccupied { get; init; }
    public DateTime DateAdded { get; init; } = DateTime.UtcNow;
    public DateTime? LastModified { get; init; } = DateTime.UtcNow;
    public string LandlordId { get; init; }
}