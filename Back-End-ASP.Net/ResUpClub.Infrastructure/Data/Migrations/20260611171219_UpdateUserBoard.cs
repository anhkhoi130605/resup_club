using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ResUpClub.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserBoard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MemberInOrOutClub",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MemberInOrOutClub",
                table: "Users");
        }
    }
}
