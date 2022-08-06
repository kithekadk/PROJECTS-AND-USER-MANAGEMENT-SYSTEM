CREATE PROCEDURE createTask ( @id VARCHAR(200), @projectName VARCHAR(200), 
@description VARCHAR(200), @deadline VARCHAR(200) , @assignedTo VARCHAR(200))
AS
BEGIN
INSERT INTO PROJECTS (id,projectName, description, deadline, assignedTo)
VALUES (@id,@projectName, @description, @deadline, @assignedTo)
END
