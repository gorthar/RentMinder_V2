using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Document
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string FileUrl { get; set; }

        public DateTime UploadDate { get; set; }

        public string DocumentType { get; set; }

        public int? PropertyId { get; set; }

        public Property Property { get; set; }

        public int? LeaseId { get; set; }

        public Lease Lease { get; set; }
    }
}