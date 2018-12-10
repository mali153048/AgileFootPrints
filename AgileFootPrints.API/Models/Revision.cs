using System;
using System.Collections.Generic;

namespace AgileFootPrints.API.Models
{
    public class Revision
    {
        public int Id { get; set; }
        public string RepositoryURL { get; set; }
        public string PathInRepository { get; set; }
        public string CommitMessage { get; set; }
        public DateTime DateCraeted { get; set; }
        public int? WorkItemId { get; set; }
        public WorkItem workItem { get; set; }

        public virtual ICollection<CodeFileRevision> CodeFileRevisions { get; set; }

    }
}