#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include "libft.h"

int		ft_find_diff_index(const char *s1, const char *s2)
{
	int i;

	i = 0;
	while (s1[i] == s2[i] && s1[i])
		i++;
	return (i);
}

int		ft_countstrdiff(const char *s1, const char *s2)
{
	int i;
	int count;

	i = count = 0;
	while (s1[i])
	{
		if (s1[i] != s2[i])
			count++;
		i++;
	}
	return (count);
}

int 	ft_search_similar_id(char **tab, int *i, int *j)
{
	if (tab && i && j)
	{
		*i = *j = 0;
		while (tab[*i])
		{
			*j = *i;
			while(tab[*j])
			{
				if(ft_countstrdiff(tab[*i], tab[*j]) == 1 )
					return (1);
				*j = *j + 1;
			}
			*i += 1;
		}
	}
	return (0);
}

int	main(void)
{
	int fd;
	int nb_line;
	int len;
	int pos;
	int i;
	int i1;
	int i2;
	char *line;
	char **tab;
	char *result;

	tab = NULL;

	// First count the nb of line
	nb_line = 0;
	fd = open("puzzle", O_RDONLY);
	while (ft_get_nline(fd, &line))
		nb_line++;
	close(fd);

	// Then copy the puzzle
	i = 0;
	fd = open("puzzle", O_RDONLY);
	if (!(tab = (char**)malloc(sizeof(char*) * nb_line + 1)))
		return (-1);
	while (ft_get_nline(fd, &line))
	{
		tab[i] = ft_strdup(line);
		ft_strdel(&line);
		i++;
	}
	tab[i] = NULL;
	close(fd);

	// Search for each ID if similar with only one diff exists
	ft_search_similar_id(tab, &i1, &i2);

	// Print the correspondings IDS
	len = ft_strlen(tab[i1]);
	pos = ft_find_diff_index(tab[i1], tab[i2]);
	result = ft_strjoin((ft_strsub(tab[i1], 0, pos)), ft_strsub(tab[i1], pos + 1, len - pos));

	ft_putendl(result);
	return (0);
}
