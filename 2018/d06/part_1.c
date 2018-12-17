#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include "header.h"
#include "libft.h"


static char **ft_build_map(t_coor **list, int sqre_size)
{
	int		i;
	char	**tab;
	t_coor 	*tmp_list;

	// Init table
	if (!(tab = (char**)malloc(sizeof(char*) * (sqre_size) + 1)))
		return (NULL);
	i = -1;
	while (++i <= sqre_size)
	{
		tab[i] = ft_strnew(sqre_size);
		ft_strfill(tab[i], '.', sqre_size);
	}
	tab[i] = NULL;
	// Insert point of the list
	tmp_list = (*list);
	while (tmp_list)
	{
		tab[GET_Y(tmp_list->start)][GET_X(tmp_list->start)] = tmp_list->id;
		tmp_list = tmp_list->next;
	}
	return (tab);
}

static int  ft_get_square_size(t_coor **list)
{
	int max;
	t_coor 	*tmp_list;

	max = 0;
	tmp_list = (*list);
	while (tmp_list)
	{
		if (GET_X(tmp_list->start) > max || GET_Y(tmp_list->start) > max)
			max = (GET_X(tmp_list->start) > GET_Y(tmp_list->start)) ? GET_X(tmp_list->start) : GET_Y(tmp_list->start);
		tmp_list = tmp_list->next;
	}
	ft_putstr("Square size : ");
	ft_putnbr(max);
	ft_putendl("");
	return (max);
}

static int	ft_build_list(t_coor **list, char **line, char letter)
{
	int 		i;
	char 		*point;
	t_coor 	*element;
	t_coor 	*tmp_list;

	point = (*line);
	if (point)
	{
		// Go to the end of the list
		tmp_list = (*list);
		while (tmp_list && tmp_list->next)
			tmp_list = tmp_list->next;
		// Build a new point
		i = 0;
		if ((element = (t_coor*)malloc(sizeof(t_coor))))
		{
			element->id = letter;
			element->start = SET_X(ft_atoi(point)) + SET_Y(ft_atoi(ft_strchr(point, ' ')));
			element->next = NULL;
		}
		else
			return (0);

		if (tmp_list)
			tmp_list->next = element;
		else
			(*list) = element;
	}
	return (1);
}

int	main(void)
{
	int 			fd;
	int				i;
	char 			*line;
	char			letter;
	t_coor 		*list;
	char			**map;

	list = NULL;
	letter = 'A';
	fd = open("puzzle", O_RDONLY);
	while (ft_get_nline(fd, &line))
	{
		if (!(ft_build_list(&list, &line, letter)))
			return (-1);
		ft_strdel(&line);
		letter++;
	}
	close(fd);

	// Find at the maximum size to map before going to infinite with ft_get_square_size()
	// And build a map of this size with positionnated point.
	map = ft_build_map(&list, ft_get_square_size(&list) + 1);

	// Print table
	i = -1;
	while(map[++i])
		ft_putendl(map[i]);

	return (0);
}
