#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include "header.h"
#include "libft.h"

static int 		ft_search_overlap_square(char **map)
{
	int i;
	int j;
	int count;

	count = 0;
	i = -1;
	while (map[++i])
	{
		j = -1;
		while (map[i][++j])
			count += (map[i][j] > '1') ? 1 : 0;
	}
	return (count);
}

static void 	ft_fill_map(char **map, t_whouse *list)
{
	int i;
	int j;

	if (map && list)
	{
		while (list)
		{
			i = -1;
			while (map[++i])
			{
				j = -1;
				while (map[i][++j])
				{
					if (j >= list->start_x && j < (list->start_x + list->size_x) &&
							(i >= list->start_y && i < (list->start_y + list->size_y)))
							map[i][j]++;
				}
			}
			list = list->next;
		}
	}
}

static char **ft_build_map(t_whouse **list, float sqre_size)
{
	int		i;
	char	**tab;

	(void)list;
	if (!(tab = (char**)malloc(sizeof(char*) * (GET_Y(sqre_size) + 1))))
		return (NULL);
	i = -1;
	while (++i <= GET_Y(sqre_size))
	{
		tab[i] = ft_strnew(GET_X(sqre_size));
		ft_strfill(tab[i], '0', GET_X(sqre_size));
	}
	tab[i] = NULL;
	return (tab);
}

static float  ft_get_square_size(t_whouse **list)
{
	int max_x;
	int max_y;
	float max;
	t_whouse 	*tmp_list;

	max = 0;
	max_x = 0;
	max_y = 0;
	tmp_list = (*list);
	while (tmp_list)
	{
		if (max_x < (tmp_list->start_x + tmp_list->size_x))
			max_x = tmp_list->start_x + tmp_list->size_x;
		if (max_y < (tmp_list->start_y + tmp_list->size_y))
			max_y = tmp_list->start_y + tmp_list->size_y;
		tmp_list = tmp_list->next;
	}
	max = SET_X(max_x) + SET_Y(max_y);
	ft_putstr("Width : ");
	ft_putnbr(GET_X(max));
	ft_putendl("");
	ft_putstr("Height : ");
	ft_putnbr(GET_Y(max) + 1);
	ft_putendl("");
	return (max);
}

static int	ft_build_list(t_whouse **list, char **line)
{
	int i;
	char *claim;
	t_whouse 	*element;
	t_whouse 	*tmp_list;

	claim = (*line);
	if (claim)
	{
		// Go to the end of the list
		tmp_list = (*list);
		while (tmp_list && tmp_list->next)
			tmp_list = tmp_list->next;
		// Build a new warehouse
		i = 0;
		if ((element = (t_whouse*)malloc(sizeof(t_whouse))))
		{
			element->id = ft_atoi(claim + 1);
			while (*claim != '@')
				claim++;
			element->start_x = ft_atoi(claim + 1);
			while (*claim != ',')
				claim++;
			element->start_y = ft_atoi(claim + 1);
			while (*claim != ':')
				claim++;
			element->size_x = ft_atoi(claim + 1);
			while (*claim != 'x')
				claim++;
			element->size_y = ft_atoi(claim + 1);
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
	char 			*line;
	t_whouse 	*list;
	char 			**map;

	list = NULL;
	fd = open("puzzle", O_RDONLY);
	while (ft_get_nline(fd, &line))
	{
		if (!(ft_build_list(&list, &line)))
			return (-1);
		ft_strdel(&line);
	}
	close(fd);

	// Build a map at the right size and fill it with 0 and then add 1 when
	// a warehouse is placed
	map = ft_build_map(&list, ft_get_square_size(&list));
	ft_fill_map(map, list);

	// Search for square > 1
	ft_putnbr(ft_search_overlap_square(map));
	return (0);
}
