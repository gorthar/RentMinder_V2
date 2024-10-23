namespace API.DTOs
{
    public class NewLeaseDto
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        public string TenantEmail { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public decimal MonthlyRent { get; set; }
        public decimal SecurityDeposit { get; set; }
    }
}