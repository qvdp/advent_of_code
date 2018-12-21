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
		tab[i] = ft_strnew(sqre_size);
	tab[i] = NULL;
	// Insert point of the list
	tmp_list = (*list);
	while (tmp_list)
	{
		tab[tmp_list->start_y][tmp_list->start_x] = tmp_list->id;
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
		if (tmp_list->start_x > max || tmp_list->start_y > max)
			max = (tmp_list->start_x > tmp_list->start_y) ? tmp_list->start_x : tmp_list->start_y;
		tmp_list = tmp_list->next;
	}
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
			element->start_x = ft_atoi(point);
			element->start_y = ft_atoi(ft_strchr(point, ' '));
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

static int  ft_is_in_region(t_coor **list, int x1, int y1)
{
	t_coor *temp;
	int dist_tot;
	int dist;
	int x;
	int y;

	if (list)
	{
		dist_tot = 0;
		temp = *list;
		while (temp && dist_tot < 10000)
		{
			x = temp->start_x - x1;
			y = temp->start_y - y1;
			x *= x < 0 ? -1 : 1;
			y *= y < 0 ? -1 : 1;
			dist = x + y;
			dist_tot += dist;
			temp = temp->next;
		}
		return (dist_tot < 10000 ? 1 : 0);
	}
	return (0);
}

int	main(void)
{
	int 			fd;
	int 			size;
	char 			*line;
	char			letter;
	t_coor 		*list;
	char			**map;
	int			cursor_x;
	int			cursor_y;

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
	size = ft_get_square_size(&list);
	map = ft_build_map(&list, size + 1);

	// Determine the sum of dist betweem cursor and each point and fill the map in consquence
	cursor_x = 0;
	cursor_y = 0;
	while (cursor_y <= size + 1)
	{
		map[cursor_y][cursor_x] = ft_is_in_region(&list, cursor_x, cursor_y) ? '#' : '.';
		if (cursor_x == size)
		{
			cursor_x = 0;
			cursor_y++;
		}
		else
		 	cursor_x += 1;
	}

	// Mesure area
	size = 0;
	while (*map)
	{
		size += ft_strcount(*map, '#');
		map++;
	}
	ft_putnbr(size);
	return (0);
}
