using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DB
{
    public class PropertyManagementContext : DbContext
    {
        public PropertyManagementContext(DbContextOptions<PropertyManagementContext> options)
        : base(options)
        {
        }

        public DbSet<Landlord> Landlords { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<Lease> Leases { get; set; }
        public DbSet<RentPayment> RentPayments { get; set; }
        public DbSet<MaintenanceRequest> MaintenanceRequests { get; set; }
        public DbSet<Inspection> Inspections { get; set; }
        public DbSet<Document> Documents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().UseTpcMappingStrategy();

            // Landlord configuration
            modelBuilder.Entity<Landlord>()
                .HasMany(l => l.Properties)
                .WithOne(p => p.Landlord)
                .HasForeignKey(p => p.LandlordId)
                .OnDelete(DeleteBehavior.Restrict);

            // Tenant configuration
            modelBuilder.Entity<Tenant>()
                .HasMany(t => t.Leases)
                .WithOne(l => l.Tenant)
                .HasForeignKey(l => l.TenantId)
                .OnDelete(DeleteBehavior.Restrict);

            // Property configuration
            modelBuilder.Entity<Property>()
                .Property(p => p.Address)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Entity<Property>()
                .Property(p => p.MonthlyRent)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Property>()
                .Property(p => p.SquareFootage)
                .HasColumnType("decimal(18,2)");

            // Lease configuration
            modelBuilder.Entity<Lease>()
                .HasOne(l => l.Property)
                .WithMany(p => p.Leases)
                .HasForeignKey(l => l.PropertyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Lease>()
                .Property(l => l.MonthlyRent)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Lease>()
                .Property(l => l.SecurityDeposit)
                .HasColumnType("decimal(18,2)");

            // RentPayment configuration
            modelBuilder.Entity<RentPayment>()
                .HasOne(r => r.Lease)
                .WithMany(l => l.RentPayments)
                .HasForeignKey(r => r.LeaseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RentPayment>()
                .Property(r => r.Amount)
                .HasColumnType("decimal(18,2)");

            // MaintenanceRequest configuration
            modelBuilder.Entity<MaintenanceRequest>()
                .HasOne(m => m.Property)
                .WithMany(p => p.MaintenanceRequests)
                .HasForeignKey(m => m.PropertyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MaintenanceRequest>()
                .Property(m => m.Cost)
                .HasColumnType("decimal(18,2)");

            // Inspection configuration
            modelBuilder.Entity<Inspection>()
                .HasOne(i => i.Property)
                .WithMany(p => p.Inspections)
                .HasForeignKey(i => i.PropertyId)
                .OnDelete(DeleteBehavior.Restrict);

            // Document configuration
            modelBuilder.Entity<Document>()
                .HasOne(d => d.Property)
                .WithMany()
                .HasForeignKey(d => d.PropertyId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Document>()
                .HasOne(d => d.Lease)
                .WithMany()
                .HasForeignKey(d => d.LeaseId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}