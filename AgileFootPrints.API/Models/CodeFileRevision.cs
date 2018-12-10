namespace AgileFootPrints.API.Models
{
    public class CodeFileRevision
    {
        public int Id { get; set; }
        public int CodeFileId { get; set; }
        public int RevisionId { get; set; }
        public CodeFile CodeFile { get; set; }
        public Revision Revision { get; set; }
    }
}