using System.Collections.Generic;

namespace AgileFootPrints.API.Models
{
    public class CodeFile
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string ProjectName { get; set; }
        public string PathInProject { get; set; }

        public virtual ICollection<CodeFileRevision> CodeFileRevisions { get; set; }

    }
}