using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.DB.Migrations
{
    /// <inheritdoc />
    public partial class addurgencytoMaintenanceRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Urgency",
                table: "MaintenanceRequests",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Urgency",
                table: "MaintenanceRequests");
        }
    }
}
