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

static int  ft_get_manh_dist(int x1, int y1, int x2, int y2)
{
	int dist;
	int x;
	int y;

	x = x2 - x1;
	y = y2 - y1;
	x *= x < 0 ? -1 : 1;
	y *= y < 0 ? -1 : 1;
	dist = x + y;
	return (dist + 1);
}

static char 	ft_check_point(t_coor **list, char ***map, int cursor_x, int cursor_y, int sqre_size)
{
	t_coor *tmp;
	int min;
	char min_id;

	if (map && list)
	{
		min = sqre_size + sqre_size;
		tmp = *list;
		while(tmp)
		{
			if (min > ft_get_manh_dist(cursor_x, cursor_y, tmp->start_x, tmp->start_y))
			{
				min = ft_get_manh_dist(cursor_x, cursor_y, tmp->start_x, tmp->start_y);
				min_id = tmp->id;
			}
			else if ( min == ft_get_manh_dist(cursor_x, cursor_y, tmp->start_x, tmp->start_y))
				min_id = '.';
			tmp = tmp->next;
		}
		return(min_id);
	}
	return (0);
}

static int 		ft_count_largest(t_coor **list, char **map, int sqre_size)
{
	t_coor *tmp;
	int i;
	int max_value;
	int temp_max;
	char max_id;

	if (list && map)
	{
		tmp = *list;
		max_value = 0;
		while (tmp)
		{
			i = -1;
			temp_max = 0;
			while (map[++i])
			{
				if ((i == 0 || i == sqre_size) && (ft_strchr(map[i], tmp->id)))
					break ;
				if (map[i][0] == tmp->id || map[i][sqre_size] == tmp->id)
					break ;
				temp_max = temp_max + ft_strcount(map[i], tmp->id);
			}
			if (temp_max > max_value)
			{
				max_value = temp_max;
				max_id = tmp->id;
			}
			tmp = tmp->next;
		}
		return (max_value);
	}
	return (0);
}

int	main(void)
{
	int 			fd;
	int 			sqre_size;
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
	sqre_size = ft_get_square_size(&list);
	map = ft_build_map(&list, sqre_size + 1);

	// Determine the value of each point
	cursor_x = 0;
	cursor_y = 0;
	while (cursor_y <= sqre_size + 1)
	{
		map[cursor_y][cursor_x] = ft_check_point(&list, &map, cursor_x, cursor_y, sqre_size);
		if (cursor_x == sqre_size)
		{
			cursor_x = 0;
			cursor_y++;
		}
		else
		 	cursor_x += 1;
	}
	ft_putnbr(ft_count_largest(&list, map, sqre_size));
	return (0);
}
