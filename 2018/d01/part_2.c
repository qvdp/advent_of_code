#include <fcntl.h>
#include <unistd.h>
#include "libft.h"
#include <stdlib.h>

int	ft_intchr(const int *tab, int nb, int len)
{
  int i;

  i = 0;
	while (i < len)
	{
		if (tab[i] == nb)
			return (1);
		i++;
	}
	return (0);
}

int	main(void)
{
	int 	fd;
	int 	*hz;
  int   *tmp_hz;
  int   count;
	char 	*line;
  int   i;

  count = 1;
  tmp_hz = NULL;
  if (!(hz = (int*)malloc(sizeof(hz) * 1)))
    return (-1);
  hz[0] = 0;
  while (1)
  {
    fd = open("puzzle", O_RDONLY);
    while (ft_get_nline(fd, &line))
  	{
      tmp_hz = hz;
      if (!(hz = (int*)malloc(sizeof(hz) * count)))
        return (-1);
      i = 0;
      while (i < count)
      {
        hz[i] = tmp_hz[i];
        i++;
      }
      free(tmp_hz);
      hz[i] = (i == 0) ?  0 : (hz[i - 1] + ft_atoi(line));
      if (ft_intchr(&hz[0], hz[i], count) == 1)
      {
        ft_putnbr(hz[i]);
        ft_putendl("");
        return (0);
      }
  		count++;
  	}
    close(fd);
  }
  return (0);
}
