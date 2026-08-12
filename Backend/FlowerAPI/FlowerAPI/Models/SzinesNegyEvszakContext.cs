using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FlowerAPI.Models;

public partial class SzinesNegyEvszakContext : DbContext
{
    public SzinesNegyEvszakContext()
    {
    }

    public SzinesNegyEvszakContext(DbContextOptions<SzinesNegyEvszakContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Costumer> Costumers { get; set; }

    public virtual DbSet<PinebaseOrder> PinebaseOrders { get; set; }

    public virtual DbSet<Pinebasetype> Pinebasetypes { get; set; }

    public virtual DbSet<PinebatchOrder> PinebatchOrders { get; set; }

    public virtual DbSet<Pinebatchstate> Pinebatchstates { get; set; }

    public virtual DbSet<Pinetype> Pinetypes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;database=szines_negy_evszak;user=root;password=");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Costumer>(entity =>
        {
            entity.HasKey(e => e.CostumerId).HasName("PRIMARY");

            entity.ToTable("costumers");

            entity.Property(e => e.CostumerId).HasColumnName("costumer_id");
            entity.Property(e => e.CostumerAddress)
                .HasMaxLength(60)
                .HasColumnName("costumer_address");
            entity.Property(e => e.CostumerCity)
                .HasMaxLength(50)
                .HasColumnName("costumer_city");
            entity.Property(e => e.CostumerName)
                .HasMaxLength(150)
                .HasColumnName("costumer_name");
            entity.Property(e => e.CostumerPhonenumber)
                .HasMaxLength(10)
                .HasColumnName("costumer_phonenumber");
            entity.Property(e => e.CostumerPostalCode).HasColumnName("costumer_postal_code");
            entity.Property(e => e.CostumerTaxnumber)
                .HasMaxLength(13)
                .HasColumnName("costumer_taxnumber");
        });

        modelBuilder.Entity<PinebaseOrder>(entity =>
        {
            entity.HasKey(e => e.BaseId).HasName("PRIMARY");

            entity.ToTable("pinebase_order");

            entity.HasIndex(e => e.CostumerId, "fk_costumer_id");

            entity.HasIndex(e => e.PineTypeId, "fk_pinebase_pinetype");

            entity.HasIndex(e => e.Pinebasetype, "fk_pinebasetype");

            entity.Property(e => e.BaseId).HasColumnName("base_id");
            entity.Property(e => e.BatchOrderedDate)
                .HasColumnType("date")
                .HasColumnName("batch_ordered_date");
            entity.Property(e => e.BatchQuantity).HasColumnName("batch_quantity");
            entity.Property(e => e.BatchState).HasColumnName("batch_state");
            entity.Property(e => e.BatchUpdatedAt)
                .HasColumnType("date")
                .HasColumnName("batch_updated_at");
            entity.Property(e => e.CostumerId).HasColumnName("costumer_id");
            entity.Property(e => e.PineTypeId).HasColumnName("pine_type_id");
            entity.Property(e => e.Pinebasetype).HasColumnName("pinebasetype");

            entity.HasOne(d => d.Costumer).WithMany(p => p.PinebaseOrders)
                .HasForeignKey(d => d.CostumerId)
                .HasConstraintName("fk_costumer_id");

            entity.HasOne(d => d.PineType).WithMany(p => p.PinebaseOrders)
                .HasForeignKey(d => d.PineTypeId)
                .HasConstraintName("fk_pinebase_pinetype");

            entity.HasOne(d => d.PinebasetypeNavigation).WithMany(p => p.PinebaseOrders)
                .HasForeignKey(d => d.Pinebasetype)
                .HasConstraintName("fk_pinebasetype");
        });

        modelBuilder.Entity<Pinebasetype>(entity =>
        {
            entity.HasKey(e => e.BaseId).HasName("PRIMARY");

            entity.ToTable("pinebasetype");

            entity.Property(e => e.BaseId).HasColumnName("base_id");
            entity.Property(e => e.BaseType)
                .HasMaxLength(10)
                .HasColumnName("base_type");
        });

        modelBuilder.Entity<PinebatchOrder>(entity =>
        {
            entity.HasKey(e => e.BatchId).HasName("PRIMARY");

            entity.ToTable("pinebatch_order");

            entity.HasIndex(e => e.PineTypeId, "fk_pinebatch_pinetype");

            entity.HasIndex(e => e.PinebatchStateId, "fk_pinebatch_state_id");

            entity.Property(e => e.BatchId).HasColumnName("batch_id");
            entity.Property(e => e.BatchArrivedDate)
                .HasColumnType("timestamp")
                .HasColumnName("batch_arrived_date");
            entity.Property(e => e.BatchQuantity).HasColumnName("batch_quantity");
            entity.Property(e => e.BatchUpdatedAt)
                .HasColumnType("timestamp")
                .HasColumnName("batch_updated_at");
            entity.Property(e => e.PineTypeId).HasColumnName("pine_type_id");
            entity.Property(e => e.PinebatchStateId).HasColumnName("pinebatch_state_id");

            entity.HasOne(d => d.PineType).WithMany(p => p.PinebatchOrders)
                .HasForeignKey(d => d.PineTypeId)
                .HasConstraintName("fk_pinebatch_pinetype");

            entity.HasOne(d => d.PinebatchState).WithMany(p => p.PinebatchOrders)
                .HasForeignKey(d => d.PinebatchStateId)
                .HasConstraintName("fk_pinebatch_state_id");
        });

        modelBuilder.Entity<Pinebatchstate>(entity =>
        {
            entity.HasKey(e => e.BatchStateId).HasName("PRIMARY");

            entity.ToTable("pinebatchstate");

            entity.Property(e => e.BatchStateId).HasColumnName("batch_state_id");
            entity.Property(e => e.BatchState)
                .HasMaxLength(10)
                .HasColumnName("batch_state");
        });

        modelBuilder.Entity<Pinetype>(entity =>
        {
            entity.HasKey(e => e.PineId).HasName("PRIMARY");

            entity.ToTable("pinetypes");

            entity.Property(e => e.PineId).HasColumnName("pine_id");
            entity.Property(e => e.PineType)
                .HasMaxLength(10)
                .HasColumnName("pine_type");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("users");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.PassWord)
                .HasMaxLength(10)
                .HasColumnName("pass_word");
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .HasColumnName("user_name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
