#include <fcntl.h>
#include <unistd.h>
#include "libft.h"

int	main(void)
{
	int 	fd;
	int 	count;
	char 	*line;

	count = 0;
	fd = open("puzzle", O_RDONLY);
	while (ft_get_nline(fd, &line))
	{
		count += ft_atoi(line);
	}
	close(fd);
	ft_putnbr(count);
	ft_putendl("");
	return (0);
}
