#include <fcntl.h>
#include <unistd.h>
#include "libft.h"

int	ft_strcountchr(const char *s, int c)
{
	int count;

	count = 0;
	if (c == '\0')
		return (0);
	while (*s)
	{
		if (*s == c)
			count++;;
		s++;
	}
	return (count);
}

int	main(void)
{
	int fd;
	int i;
	int count_2;
	int count_3;
	char *line;


	count_2 = count_3 = 0;
	fd = open("puzzle", O_RDONLY);
	while (ft_get_nline(fd, &line))
	{
		i = 0;
		while (line[i])
		{
			if (ft_strcountchr(line, line[i]) == 2)
			{
				count_2++;
				break ;
			}
			i++;
		}
		i = 0;
		while (line[i])
		{
			if (ft_strcountchr(line, line[i]) == 3)
			{
				count_3++;
				break ;
			}
			i++;
		}
	}
	ft_putnbr((count_2 * count_3));
	close(fd);
	return (0);
}
