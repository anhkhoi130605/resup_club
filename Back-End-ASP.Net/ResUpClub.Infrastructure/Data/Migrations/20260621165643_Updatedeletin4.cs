using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ResUpClub.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Updatedeletin4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BlackList_Users_UserId",
                table: "BlackList");

            migrationBuilder.DropForeignKey(
                name: "FK_EventAgendas_Profiles_ProfileId",
                table: "EventAgendas");

            migrationBuilder.DropForeignKey(
                name: "FK_EventWaitlists_Profiles_ProfileId",
                table: "EventWaitlists");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Profiles_ProfileId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_Inclub_Profiles_ProfileId",
                table: "Inclub");

            migrationBuilder.DropForeignKey(
                name: "FK_Inclub_Users_UserId",
                table: "Inclub");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_UserId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_OutClub_Profiles_ProfileId",
                table: "OutClub");

            migrationBuilder.DropForeignKey(
                name: "FK_ProfileClub_Profiles_ProfileId",
                table: "ProfileClub");

            migrationBuilder.DropForeignKey(
                name: "FK_Profiles_Users_UserId",
                table: "Profiles");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentQuizScores_Profiles_ProfileId",
                table: "StudentQuizScores");

            migrationBuilder.DropForeignKey(
                name: "FK_TeamMembers_Profiles_ProfileId",
                table: "TeamMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Profiles_ProfileId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Profiles_UserId",
                table: "Profiles");

            migrationBuilder.DropIndex(
                name: "IX_OutClub_ProfileId_ClubId",
                table: "OutClub");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Inclub_ProfileId_ClubId",
                table: "Inclub");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "ProfileId",
                table: "OutClub");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "ProfileId",
                table: "Inclub");

            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "Tickets",
                newName: "ProfileUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_ProfileId",
                table: "Tickets",
                newName: "IX_Tickets_ProfileUserId");

            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "TeamMembers",
                newName: "ProfileUserId");

            migrationBuilder.RenameIndex(
                name: "IX_TeamMembers_ProfileId",
                table: "TeamMembers",
                newName: "IX_TeamMembers_ProfileUserId");

            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "StudentQuizScores",
                newName: "ProfileUserId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentQuizScores_ProfileId",
                table: "StudentQuizScores",
                newName: "IX_StudentQuizScores_ProfileUserId");

            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "Feedbacks",
                newName: "ProfileUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Feedbacks_ProfileId",
                table: "Feedbacks",
                newName: "IX_Feedbacks_ProfileUserId");

            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "EventWaitlists",
                newName: "ProfileUserId");

            migrationBuilder.RenameIndex(
                name: "IX_EventWaitlists_ProfileId",
                table: "EventWaitlists",
                newName: "IX_EventWaitlists_ProfileUserId");

            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "EventAgendas",
                newName: "ProfileUserId");

            migrationBuilder.RenameIndex(
                name: "IX_EventAgendas_ProfileId",
                table: "EventAgendas",
                newName: "IX_EventAgendas_ProfileUserId");

            migrationBuilder.AddColumn<string>(
                name: "Bio",
                table: "Users",
                type: "longtext",
                nullable: true,
                collation: "utf8mb4_0900_ai_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "Users",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StudentProfileId",
                table: "Users",
                type: "varchar(255)",
                nullable: true,
                collation: "utf8mb4_0900_ai_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Profiles",
                type: "longtext",
                nullable: true,
                collation: "utf8mb4_0900_ai_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "EmergencyContactName",
                table: "Profiles",
                type: "longtext",
                nullable: true,
                collation: "utf8mb4_0900_ai_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "EmergencyContactPhone",
                table: "Profiles",
                type: "longtext",
                nullable: true,
                collation: "utf8mb4_0900_ai_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "StudentCode",
                table: "Profiles",
                type: "longtext",
                nullable: true,
                collation: "utf8mb4_0900_ai_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "ProfileId",
                table: "ProfileClub",
                type: "varchar(255)",
                nullable: true,
                collation: "utf8mb4_0900_ai_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "BlackList",
                type: "varchar(255)",
                nullable: true,
                collation: "utf8mb4_0900_ai_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Users_StudentProfileId",
                table: "Users",
                column: "StudentProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Profiles_Id",
                table: "Profiles",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OutClub_Id_ClubId",
                table: "OutClub",
                columns: new[] { "Id", "ClubId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Inclub_Id_ClubId",
                table: "Inclub",
                columns: new[] { "Id", "ClubId" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BlackList_Users_UserId",
                table: "BlackList",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EventAgendas_Profiles_ProfileUserId",
                table: "EventAgendas",
                column: "ProfileUserId",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EventWaitlists_Profiles_ProfileUserId",
                table: "EventWaitlists",
                column: "ProfileUserId",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Profiles_ProfileUserId",
                table: "Feedbacks",
                column: "ProfileUserId",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Inclub_Profiles_Id",
                table: "Inclub",
                column: "Id",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inclub_Users_UserId",
                table: "Inclub",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_Id",
                table: "Notifications",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OutClub_Profiles_Id",
                table: "OutClub",
                column: "Id",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfileClub_Profiles_ProfileId",
                table: "ProfileClub",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Profiles_Users_Id",
                table: "Profiles",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentQuizScores_Profiles_ProfileUserId",
                table: "StudentQuizScores",
                column: "ProfileUserId",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TeamMembers_Profiles_ProfileUserId",
                table: "TeamMembers",
                column: "ProfileUserId",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Profiles_ProfileUserId",
                table: "Tickets",
                column: "ProfileUserId",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Profiles_StudentProfileId",
                table: "Users",
                column: "StudentProfileId",
                principalTable: "Profiles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BlackList_Users_UserId",
                table: "BlackList");

            migrationBuilder.DropForeignKey(
                name: "FK_EventAgendas_Profiles_ProfileUserId",
                table: "EventAgendas");

            migrationBuilder.DropForeignKey(
                name: "FK_EventWaitlists_Profiles_ProfileUserId",
                table: "EventWaitlists");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Profiles_ProfileUserId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_Inclub_Profiles_Id",
                table: "Inclub");

            migrationBuilder.DropForeignKey(
                name: "FK_Inclub_Users_UserId",
                table: "Inclub");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_Id",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_OutClub_Profiles_Id",
                table: "OutClub");

            migrationBuilder.DropForeignKey(
                name: "FK_ProfileClub_Profiles_ProfileId",
                table: "ProfileClub");

            migrationBuilder.DropForeignKey(
                name: "FK_Profiles_Users_Id",
                table: "Profiles");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentQuizScores_Profiles_ProfileUserId",
                table: "StudentQuizScores");

            migrationBuilder.DropForeignKey(
                name: "FK_TeamMembers_Profiles_ProfileUserId",
                table: "TeamMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Profiles_ProfileUserId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Profiles_StudentProfileId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_StudentProfileId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Profiles_Id",
                table: "Profiles");

            migrationBuilder.DropIndex(
                name: "IX_OutClub_Id_ClubId",
                table: "OutClub");

            migrationBuilder.DropIndex(
                name: "IX_Inclub_Id_ClubId",
                table: "Inclub");

            migrationBuilder.DropColumn(
                name: "Bio",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "StudentProfileId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "EmergencyContactName",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "EmergencyContactPhone",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "StudentCode",
                table: "Profiles");

            migrationBuilder.RenameColumn(
                name: "ProfileUserId",
                table: "Tickets",
                newName: "ProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_ProfileUserId",
                table: "Tickets",
                newName: "IX_Tickets_ProfileId");

            migrationBuilder.RenameColumn(
                name: "ProfileUserId",
                table: "TeamMembers",
                newName: "ProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_TeamMembers_ProfileUserId",
                table: "TeamMembers",
                newName: "IX_TeamMembers_ProfileId");

            migrationBuilder.RenameColumn(
                name: "ProfileUserId",
                table: "StudentQuizScores",
                newName: "ProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentQuizScores_ProfileUserId",
                table: "StudentQuizScores",
                newName: "IX_StudentQuizScores_ProfileId");

            migrationBuilder.RenameColumn(
                name: "ProfileUserId",
                table: "Feedbacks",
                newName: "ProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_Feedbacks_ProfileUserId",
                table: "Feedbacks",
                newName: "IX_Feedbacks_ProfileId");

            migrationBuilder.RenameColumn(
                name: "ProfileUserId",
                table: "EventWaitlists",
                newName: "ProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_EventWaitlists_ProfileUserId",
                table: "EventWaitlists",
                newName: "IX_EventWaitlists_ProfileId");

            migrationBuilder.RenameColumn(
                name: "ProfileUserId",
                table: "EventAgendas",
                newName: "ProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_EventAgendas_ProfileUserId",
                table: "EventAgendas",
                newName: "IX_EventAgendas_ProfileId");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Profiles",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "",
                collation: "utf8mb4_0900_ai_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "ProfileClub",
                keyColumn: "ProfileId",
                keyValue: null,
                column: "ProfileId",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "ProfileId",
                table: "ProfileClub",
                type: "varchar(255)",
                nullable: false,
                collation: "utf8mb4_0900_ai_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.AddColumn<string>(
                name: "ProfileId",
                table: "OutClub",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "",
                collation: "utf8mb4_0900_ai_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Notifications",
                type: "varchar(255)",
                nullable: true,
                collation: "utf8mb4_0900_ai_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ProfileId",
                table: "Inclub",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "",
                collation: "utf8mb4_0900_ai_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "BlackList",
                keyColumn: "UserId",
                keyValue: null,
                column: "UserId",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "BlackList",
                type: "varchar(255)",
                nullable: false,
                collation: "utf8mb4_0900_ai_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Profiles_UserId",
                table: "Profiles",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OutClub_ProfileId_ClubId",
                table: "OutClub",
                columns: new[] { "ProfileId", "ClubId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Inclub_ProfileId_ClubId",
                table: "Inclub",
                columns: new[] { "ProfileId", "ClubId" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BlackList_Users_UserId",
                table: "BlackList",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EventAgendas_Profiles_ProfileId",
                table: "EventAgendas",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EventWaitlists_Profiles_ProfileId",
                table: "EventWaitlists",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Profiles_ProfileId",
                table: "Feedbacks",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Inclub_Profiles_ProfileId",
                table: "Inclub",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inclub_Users_UserId",
                table: "Inclub",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_UserId",
                table: "Notifications",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OutClub_Profiles_ProfileId",
                table: "OutClub",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfileClub_Profiles_ProfileId",
                table: "ProfileClub",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Profiles_Users_UserId",
                table: "Profiles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentQuizScores_Profiles_ProfileId",
                table: "StudentQuizScores",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TeamMembers_Profiles_ProfileId",
                table: "TeamMembers",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Profiles_ProfileId",
                table: "Tickets",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id");
        }
    }
}
