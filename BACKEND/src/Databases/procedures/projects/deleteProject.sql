CREATE PROCEDURE deleteProject (@projectId VARCHAR(200))
AS
BEGIN
IF EXISTS (SELECT projectId, ProjectName FROM dbo.PROJECTS WHERE projectId=@projectId)
BEGIN
	DELETE FROM PROJECTS WHERE projectId=@projectId;
	RETURN;
END
BEGIN
	RAISERROR('No Task With That Id', 11,1);
END
END