/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memchr.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/12 20:26:06 by qvan-der          #+#    #+#             */
/*   Updated: 2018/11/13 20:21:03 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <string.h>

void				*ft_memchr(const void *s, int c, size_t n)
{
	unsigned char	*s_copy;
	size_t			i;

	s_copy = (unsigned char*)s;
	i = 0;
	while (i < n)
	{
		if (s_copy[i] == (unsigned char)c)
			return ((unsigned char*)&s_copy[i]);
		i++;
	}
	return (NULL);
}
