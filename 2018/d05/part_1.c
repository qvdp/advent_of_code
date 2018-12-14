#include "libft.h"
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>

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
 	char 			*line;

	// First, we record the puzzle line
 	fd = open("puzzle", O_RDONLY);
	ft_get_nline(fd, &line);
	close(fd);
	// Apply a check function on each char. If it returns true, restart from beginning.
	i = -1;
	while (line[++i])
	{
		if (ft_check_polymer(&line, i) == 1)
			i = -1;
	}
	i = 0;
	while (line[i])
		i++;
	ft_putnbr(i);
	ft_putendl("");
	return(0);
}
