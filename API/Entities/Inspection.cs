using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Inspection
    {
        public int Id { get; set; }

        public DateTime InspectionDate { get; set; }

        public string InspectorName { get; set; }

        public string Notes { get; set; }

        public bool Passed { get; set; }

        public int PropertyId { get; set; }

        public Property Property { get; set; }
    }
}