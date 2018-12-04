/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_itoa.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/14 15:11:32 by qvan-der          #+#    #+#             */
/*   Updated: 2018/11/19 12:58:17 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include <string.h>

static void	ft_define_size(int *size, int n, int *is_negative)
{
	unsigned int abs;

	if (n < 0)
	{
		*is_negative = 1;
		abs = n * -1;
	}
	else
		abs = n;
	if (abs > 9)
	{
		ft_define_size(size, abs / 10, is_negative);
	}
	*size += 1;
}

static void	ft_fill_str(int n, char *str, int size)
{
	unsigned int abs;

	if (n < 0)
	{
		str[0] = '-';
		abs = n * -1;
	}
	else
		abs = n;
	while (abs > 9)
	{
		str[size] = (abs % 10 + '0');
		abs /= 10;
		size--;
	}
	str[size] = (abs % 10 + '0');
}

char		*ft_itoa(int n)
{
	int		is_negative;
	int		size;
	char	*str;

	size = 0;
	is_negative = 0;
	ft_define_size(&size, n, &is_negative);
	if (!(str = (char*)malloc(sizeof(char) * (size + is_negative + 1))))
		return (NULL);
	ft_fill_str(n, str, (size + is_negative - 1));
	str[size + is_negative] = '\0';
	return (str);
}
