#include "libft.h"
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>

/*******************************************************
***     THIS ONE IS PARTICULARLY LONG TO EXECUTE     ***
*******************************************************/

static char		*ft_remove_letter(char *line, char letter)
{
	int i;

	if (line)
	{
		i = 0;
		while (line[i])
		{
			if (line[i] == letter || line[i] == (letter + 32))
			{
				line = ft_strjoin(ft_strsub(line, 0, i), (line + i + 1));
				i = -1;
			}
			i++;
		}
		return (line);
	}
	return (NULL);
}

static int		ft_check_polymer(char **line, int i)
{
	char	*tmp;
	tmp = (*line);
	if (tmp)
	{
		if ((tmp[i] >= 'A' && tmp[i] <= 'Z' && (tmp[i + 1] == (tmp[i] + 32))) ||
		 		(tmp[i] >= 'a' && tmp[i] <= 'z' && (tmp[i + 1] == (tmp[i] - 32))))
		{
			*line = ft_strjoin(ft_strsub(tmp, 0, i), (tmp + i + 2));
			return (1);
		}
	}
	return (0);
}

int	main (void)
{
	int 			fd;
	int				i;
	int				min_length;
	char			letter;
 	char 			*line;
	char 			*tmp_line;

	// First, we record the puzzle line
 	fd = open("puzzle", O_RDONLY);
	ft_get_nline(fd, &line);
	close(fd);

	letter = 'A';
	min_length = 50000;
	while (letter <= 'Z')
	{
		tmp_line = ft_remove_letter(line, letter); // Remove only one unit type (one alphabet letter)
		i = -1;
		while (tmp_line[++i])
		{
			if (ft_check_polymer(&tmp_line, i) == 1) // Apply the check on this new string.
				i = -1;
		}
		i = 0;
		while (tmp_line[i])
			i++;
		free(tmp_line);
		min_length = (i < min_length) ? i : min_length;
		letter++;
	}
	ft_putnbr(min_length);
	ft_putendl("");
	return(0);
}
